/**
 * UTILITÁRIOS E FERRAMENTAS AUXILIARES
 * Funções para manipulação de ROM e dados
 */

const fs = require('fs');
const crypto = require('crypto');

class ROMUtils {
    /**
     * Lê um valor de 16 bits (2 bytes) da ROM em Little Endian
     */
    static readUInt16LE(buffer, offset) {
        return buffer.readUInt16LE(offset);
    }
    
    /**
     * Escreve um valor de 16 bits (2 bytes) na ROM em Little Endian
     */
    static writeUInt16LE(buffer, value, offset) {
        buffer.writeUInt16LE(value, offset);
    }
    
    /**
     * Lê um valor de 32 bits (4 bytes) da ROM em Little Endian
     */
    static readUInt32LE(buffer, offset) {
        return buffer.readUInt32LE(offset);
    }
    
    /**
     * Escreve um valor de 32 bits (4 bytes) na ROM em Little Endian
     */
    static writeUInt32LE(buffer, value, offset) {
        buffer.writeUInt32LE(value, offset);
    }
    
    /**
     * Lê uma string da ROM (terminada em null)
     */
    static readString(buffer, offset, maxLength = 50) {
        let str = '';
        for (let i = 0; i < maxLength; i++) {
            const byte = buffer[offset + i];
            if (byte === 0) break;
            str += String.fromCharCode(byte);
        }
        return str;
    }
    
    /**
     * Escreve uma string na ROM (com terminador null)
     */
    static writeString(buffer, str, offset, maxLength) {
        for (let i = 0; i < maxLength; i++) {
            if (i < str.length) {
                buffer[offset + i] = str.charCodeAt(i);
            } else {
                buffer[offset + i] = 0;
            }
        }
    }
    
    /**
     * Calcula checksum da ROM
     */
    static calculateChecksum(buffer) {
        return crypto.createHash('md5').update(buffer).digest('hex');
    }
    
    /**
     * Expande a ROM para acomodar novos dados
     */
    static expandROM(buffer, newSize) {
        const expanded = Buffer.alloc(newSize);
        buffer.copy(expanded);
        return expanded;
    }
    
    /**
     * Encontra espaço livre na ROM
     */
    static findFreeSpace(buffer, size, startOffset = 0x800000) {
        for (let i = startOffset; i < buffer.length - size; i++) {
            let isFree = true;
            for (let j = 0; j < size; j++) {
                if (buffer[i + j] !== 0xFF) {
                    isFree = false;
                    break;
                }
            }
            if (isFree) return i;
        }
        return -1; // Não encontrou espaço
    }
}

class PokemonDataStructure {
    /**
     * Estrutura de dados de um Pokémon no Fire Red
     * Cada entrada tem 28 bytes
     */
    static POKEMON_DATA_SIZE = 28;
    
    static parsePokemonData(buffer, offset) {
        return {
            baseHP: buffer[offset],
            baseAttack: buffer[offset + 1],
            baseDefense: buffer[offset + 2],
            baseSpeed: buffer[offset + 3],
            baseSpAttack: buffer[offset + 4],
            baseSpDefense: buffer[offset + 5],
            type1: buffer[offset + 6],
            type2: buffer[offset + 7],
            catchRate: buffer[offset + 8],
            baseExpYield: buffer[offset + 9],
            effortHP: ROMUtils.readUInt16LE(buffer, offset + 10),
            effortAttack: ROMUtils.readUInt16LE(buffer, offset + 12),
            effortDefense: ROMUtils.readUInt16LE(buffer, offset + 14),
            effortSpeed: ROMUtils.readUInt16LE(buffer, offset + 16),
            effortSpAttack: ROMUtils.readUInt16LE(buffer, offset + 18),
            effortSpDefense: ROMUtils.readUInt16LE(buffer, offset + 20),
            item1: ROMUtils.readUInt16LE(buffer, offset + 22),
            item2: ROMUtils.readUInt16LE(buffer, offset + 24),
            genderRatio: buffer[offset + 26],
            eggCycles: buffer[offset + 27]
        };
    }
    
    static writePokemonData(buffer, offset, data) {
        buffer[offset] = data.baseHP;
        buffer[offset + 1] = data.baseAttack;
        buffer[offset + 2] = data.baseDefense;
        buffer[offset + 3] = data.baseSpeed;
        buffer[offset + 4] = data.baseSpAttack;
        buffer[offset + 5] = data.baseSpDefense;
        buffer[offset + 6] = data.type1;
        buffer[offset + 7] = data.type2;
        buffer[offset + 8] = data.catchRate;
        buffer[offset + 9] = data.baseExpYield;
        ROMUtils.writeUInt16LE(buffer, data.effortHP, offset + 10);
        ROMUtils.writeUInt16LE(buffer, data.effortAttack, offset + 12);
        ROMUtils.writeUInt16LE(buffer, data.effortDefense, offset + 14);
        ROMUtils.writeUInt16LE(buffer, data.effortSpeed, offset + 16);
        ROMUtils.writeUInt16LE(buffer, data.effortSpAttack, offset + 18);
        ROMUtils.writeUInt16LE(buffer, data.effortSpDefense, offset + 20);
        ROMUtils.writeUInt16LE(buffer, data.item1, offset + 22);
        ROMUtils.writeUInt16LE(buffer, data.item2, offset + 24);
        buffer[offset + 26] = data.genderRatio;
        buffer[offset + 27] = data.eggCycles;
    }
}

class WildEncounterStructure {
    /**
     * Estrutura de encontros selvagens
     */
    static ENCOUNTER_SIZE = 4; // 2 bytes para nível, 2 bytes para espécie
    
    static parseWildEncounter(buffer, offset) {
        return {
            minLevel: buffer[offset],
            maxLevel: buffer[offset + 1],
            species: ROMUtils.readUInt16LE(buffer, offset + 2)
        };
    }
    
    static writeWildEncounter(buffer, offset, encounter) {
        buffer[offset] = encounter.minLevel;
        buffer[offset + 1] = encounter.maxLevel;
        ROMUtils.writeUInt16LE(buffer, encounter.species, offset + 2);
    }
}

class TrainerStructure {
    /**
     * Estrutura de dados de treinador
     */
    static parseTrainer(buffer, offset) {
        const flags = buffer[offset];
        const trainerClass = buffer[offset + 1];
        const encounterMusic = buffer[offset + 2];
        const trainerPic = buffer[offset + 3];
        const namePointer = ROMUtils.readUInt32LE(buffer, offset + 4);
        const item1 = ROMUtils.readUInt16LE(buffer, offset + 8);
        const item2 = ROMUtils.readUInt16LE(buffer, offset + 10);
        const item3 = ROMUtils.readUInt16LE(buffer, offset + 12);
        const item4 = ROMUtils.readUInt16LE(buffer, offset + 14);
        const doubleBattle = ROMUtils.readUInt32LE(buffer, offset + 16);
        const pokemonPointer = ROMUtils.readUInt32LE(buffer, offset + 20);
        
        return {
            flags,
            trainerClass,
            encounterMusic,
            trainerPic,
            namePointer,
            items: [item1, item2, item3, item4],
            doubleBattle,
            pokemonPointer
        };
    }
}

class MoveStructure {
    /**
     * Estrutura de dados de movimento
     * Cada movimento tem 12 bytes
     */
    static MOVE_DATA_SIZE = 12;
    
    static parseMoveData(buffer, offset) {
        return {
            effect: buffer[offset],
            basePower: buffer[offset + 1],
            type: buffer[offset + 2],
            accuracy: buffer[offset + 3],
            pp: buffer[offset + 4],
            effectAccuracy: buffer[offset + 5],
            target: buffer[offset + 6],
            priority: buffer[offset + 7],
            flags: ROMUtils.readUInt32LE(buffer, offset + 8)
        };
    }
    
    static writeMoveData(buffer, offset, data) {
        buffer[offset] = data.effect;
        buffer[offset + 1] = data.basePower;
        buffer[offset + 2] = data.type;
        buffer[offset + 3] = data.accuracy;
        buffer[offset + 4] = data.pp;
        buffer[offset + 5] = data.effectAccuracy;
        buffer[offset + 6] = data.target;
        buffer[offset + 7] = data.priority;
        ROMUtils.writeUInt32LE(buffer, data.flags, offset + 8);
    }
}

class ValidationUtils {
    /**
     * Valida se a ROM é Fire Red válida
     */
    static validateFireRedROM(buffer) {
        // Verificar header da ROM
        const gameCode = ROMUtils.readString(buffer, 0xAC, 4);
        const gameTitle = ROMUtils.readString(buffer, 0xA0, 12);
        
        if (gameCode !== 'BPRE' && gameCode !== 'BPRF') {
            throw new Error('ROM não é Pokémon Fire Red válida');
        }
        
        return true;
    }
    
    /**
     * Valida dados de Pokémon
     */
    static validatePokemonData(data) {
        const errors = [];
        
        if (data.baseHP < 1 || data.baseHP > 255) {
            errors.push('HP base inválido');
        }
        
        if (data.baseAttack < 1 || data.baseAttack > 255) {
            errors.push('Attack base inválido');
        }
        
        if (data.type1 < 0 || data.type1 > 17) {
            errors.push('Tipo 1 inválido');
        }
        
        if (data.type2 !== null && (data.type2 < 0 || data.type2 > 17)) {
            errors.push('Tipo 2 inválido');
        }
        
        if (data.catchRate < 3 || data.catchRate > 255) {
            errors.push('Taxa de captura inválida');
        }
        
        return errors;
    }
    
    /**
     * Valida dados de movimento
     */
    static validateMoveData(data) {
        const errors = [];
        
        if (data.basePower < 0 || data.basePower > 255) {
            errors.push('Poder base inválido');
        }
        
        if (data.type < 0 || data.type > 17) {
            errors.push('Tipo inválido');
        }
        
        if (data.accuracy < 0 || data.accuracy > 100) {
            errors.push('Precisão inválida');
        }
        
        if (data.pp < 1 || data.pp > 40) {
            errors.push('PP inválido');
        }
        
        return errors;
    }
}

class BackupManager {
    /**
     * Cria backup da ROM original
     */
    static createBackup(romPath) {
        const backupPath = romPath.replace('.gba', '_backup.gba');
        fs.copyFileSync(romPath, backupPath);
        console.log(`Backup criado: ${backupPath}`);
        return backupPath;
    }
    
    /**
     * Restaura ROM do backup
     */
    static restoreBackup(romPath) {
        const backupPath = romPath.replace('.gba', '_backup.gba');
        if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, romPath);
            console.log(`ROM restaurada do backup`);
            return true;
        }
        return false;
    }
}

class ProgressTracker {
    constructor(totalSteps) {
        this.totalSteps = totalSteps;
        this.currentStep = 0;
        this.startTime = Date.now();
    }
    
    step(description) {
        this.currentStep++;
        const progress = (this.currentStep / this.totalSteps * 100).toFixed(1);
        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
        
        console.log(`[${progress}%] ${description} (${elapsed}s)`);
    }
    
    complete() {
        const totalTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
        console.log(`✅ Concluído em ${totalTime} segundos!`);
    }
}

module.exports = {
    ROMUtils,
    PokemonDataStructure,
    WildEncounterStructure,
    TrainerStructure,
    MoveStructure,
    ValidationUtils,
    BackupManager,
    ProgressTracker
};