/**
 * CONFIGURAÇÕES AVANÇADAS PARA HACK ROM
 * Sistema de balanceamento e configurações específicas
 */

class HackConfiguration {
    constructor() {
        this.difficultySettings = {
            moderate: {
                trainerLevelBoost: 1.2,
                aiLevel: 2, // 0-3 scale
                itemUsage: true,
                betterMovesets: true,
                typeAdvantageAwareness: true,
                switchingLogic: true
            }
        };
        
        this.randomizationSettings = {
            wildPokemon: {
                enabled: true,
                respectBST: true,
                similarTypes: 0.3,
                evolutionStages: true,
                legendaryRestrictions: true
            },
            
            trainerPokemon: {
                enabled: true,
                keepAces: false, // Manter Pokémon principais dos líderes
                respectThemes: 0.5, // 50% chance de manter tema do tipo
                levelVariation: 3
            },
            
            starters: {
                enabled: true,
                onlyStageOne: true,
                balancedTypes: true
            }
        };
    }
}

/**
 * SISTEMA DE TIPOS EXPANDIDO
 * Inclui o tipo Fairy da Gen 6
 */
class TypeSystem {
    constructor() {
        this.types = {
            NORMAL: 0, FIRE: 1, WATER: 2, ELECTRIC: 3, GRASS: 4,
            ICE: 5, FIGHTING: 6, POISON: 7, GROUND: 8, FLYING: 9,
            PSYCHIC: 10, BUG: 11, ROCK: 12, GHOST: 13, DRAGON: 14,
            DARK: 15, STEEL: 16, FAIRY: 17
        };
        
        // Tabela de efetividade expandida com tipo Fairy
        this.effectiveness = this.buildEffectivenessChart();
    }
    
    buildEffectivenessChart() {
        // Matriz 18x18 para todos os tipos incluindo Fairy
        const chart = Array(18).fill().map(() => Array(18).fill(1.0));
        
        // Implementar todas as relações de tipo
        // Super efetivo (2x)
        this.setSuperEffective(chart);
        
        // Não muito efetivo (0.5x)
        this.setNotVeryEffective(chart);
        
        // Sem efeito (0x)
        this.setNoEffect(chart);
        
        return chart;
    }
    
    setSuperEffective(chart) {
        const superEffective = [
            // [Atacante, Defensor]
            [this.types.FIRE, this.types.GRASS],
            [this.types.FIRE, this.types.ICE],
            [this.types.FIRE, this.types.BUG],
            [this.types.FIRE, this.types.STEEL],
            [this.types.WATER, this.types.FIRE],
            [this.types.WATER, this.types.GROUND],
            [this.types.WATER, this.types.ROCK],
            [this.types.ELECTRIC, this.types.WATER],
            [this.types.ELECTRIC, this.types.FLYING],
            [this.types.GRASS, this.types.WATER],
            [this.types.GRASS, this.types.GROUND],
            [this.types.GRASS, this.types.ROCK],
            [this.types.ICE, this.types.GRASS],
            [this.types.ICE, this.types.GROUND],
            [this.types.ICE, this.types.FLYING],
            [this.types.ICE, this.types.DRAGON],
            [this.types.FIGHTING, this.types.NORMAL],
            [this.types.FIGHTING, this.types.ICE],
            [this.types.FIGHTING, this.types.ROCK],
            [this.types.FIGHTING, this.types.DARK],
            [this.types.FIGHTING, this.types.STEEL],
            [this.types.POISON, this.types.GRASS],
            [this.types.POISON, this.types.FAIRY],
            [this.types.GROUND, this.types.FIRE],
            [this.types.GROUND, this.types.ELECTRIC],
            [this.types.GROUND, this.types.POISON],
            [this.types.GROUND, this.types.ROCK],
            [this.types.GROUND, this.types.STEEL],
            [this.types.FLYING, this.types.ELECTRIC],
            [this.types.FLYING, this.types.GRASS],
            [this.types.FLYING, this.types.FIGHTING],
            [this.types.FLYING, this.types.BUG],
            [this.types.PSYCHIC, this.types.FIGHTING],
            [this.types.PSYCHIC, this.types.POISON],
            [this.types.BUG, this.types.GRASS],
            [this.types.BUG, this.types.PSYCHIC],
            [this.types.BUG, this.types.DARK],
            [this.types.ROCK, this.types.FIRE],
            [this.types.ROCK, this.types.ICE],
            [this.types.ROCK, this.types.FLYING],
            [this.types.ROCK, this.types.BUG],
            [this.types.GHOST, this.types.PSYCHIC],
            [this.types.GHOST, this.types.GHOST],
            [this.types.DRAGON, this.types.DRAGON],
            [this.types.DARK, this.types.PSYCHIC],
            [this.types.DARK, this.types.GHOST],
            [this.types.STEEL, this.types.ICE],
            [this.types.STEEL, this.types.ROCK],
            [this.types.STEEL, this.types.FAIRY],
            [this.types.FAIRY, this.types.FIGHTING],
            [this.types.FAIRY, this.types.DRAGON],
            [this.types.FAIRY, this.types.DARK]
        ];
        
        superEffective.forEach(([attacker, defender]) => {
            chart[attacker][defender] = 2.0;
        });
    }
    
    setNotVeryEffective(chart) {
        const notVeryEffective = [
            [this.types.FIRE, this.types.FIRE],
            [this.types.FIRE, this.types.WATER],
            [this.types.FIRE, this.types.ROCK],
            [this.types.FIRE, this.types.DRAGON],
            [this.types.WATER, this.types.WATER],
            [this.types.WATER, this.types.GRASS],
            [this.types.WATER, this.types.DRAGON],
            [this.types.ELECTRIC, this.types.ELECTRIC],
            [this.types.ELECTRIC, this.types.GRASS],
            [this.types.ELECTRIC, this.types.DRAGON],
            [this.types.GRASS, this.types.FIRE],
            [this.types.GRASS, this.types.GRASS],
            [this.types.GRASS, this.types.POISON],
            [this.types.GRASS, this.types.FLYING],
            [this.types.GRASS, this.types.BUG],
            [this.types.GRASS, this.types.DRAGON],
            [this.types.GRASS, this.types.STEEL],
            [this.types.ICE, this.types.FIRE],
            [this.types.ICE, this.types.WATER],
            [this.types.ICE, this.types.ICE],
            [this.types.ICE, this.types.STEEL],
            [this.types.FIGHTING, this.types.POISON],
            [this.types.FIGHTING, this.types.FLYING],
            [this.types.FIGHTING, this.types.PSYCHIC],
            [this.types.FIGHTING, this.types.BUG],
            [this.types.FIGHTING, this.types.FAIRY],
            [this.types.POISON, this.types.POISON],
            [this.types.POISON, this.types.GROUND],
            [this.types.POISON, this.types.ROCK],
            [this.types.POISON, this.types.GHOST],
            [this.types.FLYING, this.types.ELECTRIC],
            [this.types.FLYING, this.types.ROCK],
            [this.types.FLYING, this.types.STEEL],
            [this.types.PSYCHIC, this.types.PSYCHIC],
            [this.types.PSYCHIC, this.types.STEEL],
            [this.types.BUG, this.types.FIRE],
            [this.types.BUG, this.types.FIGHTING],
            [this.types.BUG, this.types.POISON],
            [this.types.BUG, this.types.FLYING],
            [this.types.BUG, this.types.GHOST],
            [this.types.BUG, this.types.STEEL],
            [this.types.BUG, this.types.FAIRY],
            [this.types.ROCK, this.types.FIGHTING],
            [this.types.ROCK, this.types.GROUND],
            [this.types.ROCK, this.types.STEEL],
            [this.types.GHOST, this.types.DARK],
            [this.types.DRAGON, this.types.STEEL],
            [this.types.DARK, this.types.FIGHTING],
            [this.types.DARK, this.types.DARK],
            [this.types.DARK, this.types.FAIRY],
            [this.types.STEEL, this.types.FIRE],
            [this.types.STEEL, this.types.WATER],
            [this.types.STEEL, this.types.ELECTRIC],
            [this.types.STEEL, this.types.STEEL],
            [this.types.FAIRY, this.types.FIRE],
            [this.types.FAIRY, this.types.POISON],
            [this.types.FAIRY, this.types.STEEL]
        ];
        
        notVeryEffective.forEach(([attacker, defender]) => {
            chart[attacker][defender] = 0.5;
        });
    }
    
    setNoEffect(chart) {
        const noEffect = [
            [this.types.NORMAL, this.types.GHOST],
            [this.types.ELECTRIC, this.types.GROUND],
            [this.types.FIGHTING, this.types.GHOST],
            [this.types.POISON, this.types.STEEL],
            [this.types.GROUND, this.types.FLYING],
            [this.types.PSYCHIC, this.types.DARK],
            [this.types.GHOST, this.types.NORMAL]
        ];
        
        noEffect.forEach(([attacker, defender]) => {
            chart[attacker][defender] = 0.0;
        });
    }
}

/**
 * SISTEMA DE HABILIDADES EXPANDIDO
 * Inclui habilidades das gerações 4-9
 */
class AbilitySystem {
    constructor() {
        this.abilities = {
            // Habilidades originais (Gen 3)
            1: { name: "Stench", description: "Pode fazer o oponente recuar" },
            2: { name: "Drizzle", description: "Invoca chuva ao entrar em batalha" },
            3: { name: "Speed Boost", description: "Aumenta Speed a cada turno" },
            4: { name: "Battle Armor", description: "Bloqueia golpes críticos" },
            5: { name: "Sturdy", description: "Não pode ser nocauteado em um hit" },
            
            // Habilidades Gen 4
            91: { name: "Adaptability", description: "STAB aumenta de 1.5x para 2x" },
            92: { name: "Download", description: "Aumenta Attack ou Sp.Atk baseado na defesa do oponente" },
            93: { name: "Iron Fist", description: "Aumenta poder de movimentos de soco em 20%" },
            94: { name: "Poison Heal", description: "Recupera HP quando envenenado" },
            95: { name: "Technician", description: "Movimentos com poder ≤60 ganham 50% de poder" },
            
            // Habilidades Gen 5
            124: { name: "Multiscale", description: "Reduz dano pela metade quando HP está cheio" },
            125: { name: "Toxic Boost", description: "Aumenta Attack quando envenenado" },
            126: { name: "Flare Boost", description: "Aumenta Sp.Atk quando queimado" },
            127: { name: "Harvest", description: "Pode recuperar berry consumida" },
            128: { name: "Telepathy", description: "Evita dano de aliados em batalhas duplas" },
            
            // Habilidades Gen 6
            165: { name: "Competitive", description: "Aumenta Sp.Atk quando stats são reduzidas" },
            166: { name: "Strong Jaw", description: "Aumenta poder de movimentos de mordida" },
            167: { name: "Refrigerate", description: "Transforma movimentos Normal em Ice" },
            168: { name: "Pixilate", description: "Transforma movimentos Normal em Fairy" },
            169: { name: "Gooey", description: "Reduz Speed do atacante ao fazer contato" },
            
            // Habilidades Gen 7
            201: { name: "Water Compaction", description: "Aumenta Defense drasticamente quando atingido por Water" },
            202: { name: "Merciless", description: "Ataques sempre são críticos contra alvos envenenados" },
            203: { name: "Shields Down", description: "Muda forma quando HP fica baixo" },
            204: { name: "Stakeout", description: "Dobra dano contra Pokémon que acabaram de entrar" },
            205: { name: "Water Bubble", description: "Reduz dano de Fire e aumenta poder de Water" },
            
            // Habilidades Gen 8
            236: { name: "Cotton Down", description: "Reduz Speed de todos quando atingido" },
            237: { name: "Propeller Tail", description: "Ignora redirecionamento de ataques" },
            238: { name: "Mirror Armor", description: "Reflete reduções de stats" },
            239: { name: "Gulp Missile", description: "Ataca quando usa Surf ou Dive" },
            240: { name: "Stalwart", description: "Ignora redirecionamento de ataques" },
            
            // Habilidades Gen 9
            267: { name: "Lingering Aroma", description: "Habilidade persiste após sair de campo" },
            268: { name: "Seed Sower", description: "Cria Grassy Terrain quando atingido" },
            269: { name: "Thermal Exchange", description: "Aumenta Attack quando atingido por Fire" },
            270: { name: "Anger Shell", description: "Aumenta stats ofensivas quando HP fica baixo" },
            271: { name: "Purifying Salt", description: "Protege contra status e reduz dano de Ghost" }
        };
    }
    
    getRandomAbility() {
        const abilityIds = Object.keys(this.abilities);
        const randomId = abilityIds[Math.floor(Math.random() * abilityIds.length)];
        return parseInt(randomId);
    }
    
    getAbilityByGeneration(gen) {
        const genRanges = {
            3: [1, 76],
            4: [77, 123],
            5: [124, 164],
            6: [165, 191],
            7: [192, 235],
            8: [236, 266],
            9: [267, 295]
        };
        
        const [start, end] = genRanges[gen] || [1, 76];
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
}

/**
 * SISTEMA DE MOVIMENTOS EXPANDIDO
 * Inclui movimentos das 9 gerações com balanceamento
 */
class MoveSystem {
    constructor() {
        this.moves = new Map();
        this.initializeMoves();
    }
    
    initializeMoves() {
        // Movimentos Gen 1-3 (base do Fire Red)
        this.addBaseGameMoves();
        
        // Movimentos Gen 4 (Physical/Special split)
        this.addGen4Moves();
        
        // Movimentos Gen 5
        this.addGen5Moves();
        
        // Movimentos Gen 6
        this.addGen6Moves();
        
        // Movimentos Gen 7
        this.addGen7Moves();
        
        // Movimentos Gen 8
        this.addGen8Moves();
        
        // Movimentos Gen 9
        this.addGen9Moves();
    }
    
    addGen4Moves() {
        const gen4Moves = [
            { id: 355, name: "Roost", type: "Flying", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 356, name: "Gravity", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 5 },
            { id: 357, name: "Miracle Eye", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 40 },
            { id: 358, name: "Wake-Up Slap", type: "Fighting", category: "Physical", power: 70, accuracy: 100, pp: 10 },
            { id: 359, name: "Hammer Arm", type: "Fighting", category: "Physical", power: 100, accuracy: 90, pp: 10 },
            { id: 360, name: "Gyro Ball", type: "Steel", category: "Physical", power: 1, accuracy: 100, pp: 5 },
            { id: 361, name: "Healing Wish", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 362, name: "Brine", type: "Water", category: "Special", power: 65, accuracy: 100, pp: 10 },
            { id: 363, name: "Natural Gift", type: "Normal", category: "Physical", power: 1, accuracy: 100, pp: 15 },
            { id: 364, name: "Feint", type: "Normal", category: "Physical", power: 30, accuracy: 100, pp: 10 }
        ];
        
        gen4Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addGen5Moves() {
        const gen5Moves = [
            { id: 468, name: "Hone Claws", type: "Dark", category: "Status", power: 0, accuracy: 100, pp: 15 },
            { id: 469, name: "Wide Guard", type: "Rock", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 470, name: "Guard Split", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 471, name: "Power Split", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 472, name: "Wonder Room", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 473, name: "Psyshock", type: "Psychic", category: "Special", power: 80, accuracy: 100, pp: 10 },
            { id: 474, name: "Venoshock", type: "Poison", category: "Special", power: 65, accuracy: 100, pp: 10 },
            { id: 475, name: "Autotomize", type: "Steel", category: "Status", power: 0, accuracy: 100, pp: 15 },
            { id: 476, name: "Rage Powder", type: "Bug", category: "Status", power: 0, accuracy: 100, pp: 20 },
            { id: 477, name: "Telekinesis", type: "Psychic", category: "Status", power: 0, accuracy: 100, pp: 15 }
        ];
        
        gen5Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addGen6Moves() {
        const gen6Moves = [
            { id: 618, name: "Sticky Web", type: "Bug", category: "Status", power: 0, accuracy: 100, pp: 20 },
            { id: 619, name: "Fell Stinger", type: "Bug", category: "Physical", power: 50, accuracy: 100, pp: 25 },
            { id: 620, name: "Phantom Force", type: "Ghost", category: "Physical", power: 90, accuracy: 100, pp: 10 },
            { id: 621, name: "Trick-or-Treat", type: "Ghost", category: "Status", power: 0, accuracy: 100, pp: 20 },
            { id: 622, name: "Noble Roar", type: "Normal", category: "Status", power: 0, accuracy: 100, pp: 30 },
            { id: 623, name: "Ion Deluge", type: "Electric", category: "Status", power: 0, accuracy: 100, pp: 25 },
            { id: 624, name: "Parabolic Charge", type: "Electric", category: "Special", power: 65, accuracy: 100, pp: 20 },
            { id: 625, name: "Forest's Curse", type: "Grass", category: "Status", power: 0, accuracy: 100, pp: 20 },
            { id: 626, name: "Petal Blizzard", type: "Grass", category: "Physical", power: 90, accuracy: 100, pp: 15 },
            { id: 627, name: "Freeze-Dry", type: "Ice", category: "Special", power: 70, accuracy: 100, pp: 20 }
        ];
        
        gen6Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addGen7Moves() {
        const gen7Moves = [
            { id: 719, name: "10,000,000 Volt Thunderbolt", type: "Electric", category: "Special", power: 195, accuracy: 100, pp: 1 },
            { id: 720, name: "Stoked Sparksurfer", type: "Electric", category: "Special", power: 175, accuracy: 100, pp: 1 },
            { id: 721, name: "Extreme Evoboost", type: "Normal", category: "Status", power: 0, accuracy: 100, pp: 1 },
            { id: 722, name: "Genesis Supernova", type: "Psychic", category: "Special", power: 185, accuracy: 100, pp: 1 },
            { id: 723, name: "Shell Trap", type: "Fire", category: "Special", power: 150, accuracy: 100, pp: 5 },
            { id: 724, name: "Fleur Cannon", type: "Fairy", category: "Special", power: 130, accuracy: 90, pp: 5 },
            { id: 725, name: "Psychic Fangs", type: "Psychic", category: "Physical", power: 85, accuracy: 100, pp: 10 },
            { id: 726, name: "Stomping Tantrum", type: "Ground", category: "Physical", power: 75, accuracy: 100, pp: 10 },
            { id: 727, name: "Shadow Bone", type: "Ghost", category: "Physical", power: 85, accuracy: 100, pp: 10 },
            { id: 728, name: "Accelerock", type: "Rock", category: "Physical", power: 40, accuracy: 100, pp: 20 }
        ];
        
        gen7Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addGen8Moves() {
        const gen8Moves = [
            { id: 796, name: "Steel Beam", type: "Steel", category: "Special", power: 140, accuracy: 95, pp: 5 },
            { id: 797, name: "Expanding Force", type: "Psychic", category: "Special", power: 80, accuracy: 100, pp: 10 },
            { id: 798, name: "Steel Roller", type: "Steel", category: "Physical", power: 130, accuracy: 100, pp: 5 },
            { id: 799, name: "Scale Shot", type: "Dragon", category: "Physical", power: 25, accuracy: 90, pp: 20 },
            { id: 800, name: "Meteor Beam", type: "Rock", category: "Special", power: 120, accuracy: 90, pp: 10 },
            { id: 801, name: "Shell Side Arm", type: "Poison", category: "Special", power: 90, accuracy: 100, pp: 10 },
            { id: 802, name: "Misty Explosion", type: "Fairy", category: "Special", power: 100, accuracy: 100, pp: 5 },
            { id: 803, name: "Grassy Glide", type: "Grass", category: "Physical", power: 70, accuracy: 100, pp: 20 },
            { id: 804, name: "Rising Voltage", type: "Electric", category: "Special", power: 70, accuracy: 100, pp: 20 },
            { id: 805, name: "Terrain Pulse", type: "Normal", category: "Special", power: 50, accuracy: 100, pp: 10 }
        ];
        
        gen8Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addGen9Moves() {
        const gen9Moves = [
            { id: 851, name: "Tera Blast", type: "Normal", category: "Special", power: 80, accuracy: 100, pp: 10 },
            { id: 852, name: "Silk Trap", type: "Bug", category: "Status", power: 0, accuracy: 100, pp: 10 },
            { id: 853, name: "Axe Kick", type: "Fighting", category: "Physical", power: 120, accuracy: 90, pp: 10 },
            { id: 854, name: "Last Respects", type: "Ghost", category: "Physical", power: 50, accuracy: 100, pp: 10 },
            { id: 855, name: "Lumina Crash", type: "Psychic", category: "Special", power: 80, accuracy: 100, pp: 10 },
            { id: 856, name: "Order Up", type: "Dragon", category: "Physical", power: 80, accuracy: 100, pp: 10 },
            { id: 857, name: "Jet Punch", type: "Water", category: "Physical", power: 60, accuracy: 100, pp: 15 },
            { id: 858, name: "Spicy Extract", type: "Grass", category: "Status", power: 0, accuracy: 100, pp: 15 },
            { id: 859, name: "Spin Out", type: "Steel", category: "Physical", power: 100, accuracy: 100, pp: 5 },
            { id: 860, name: "Population Bomb", type: "Normal", category: "Physical", power: 20, accuracy: 90, pp: 10 }
        ];
        
        gen9Moves.forEach(move => this.moves.set(move.id, move));
    }
    
    addBaseGameMoves() {
        // Movimentos básicos do Fire Red já existentes
        // Apenas referência - não precisam ser adicionados novamente
        const baseMoves = [
            { id: 1, name: "Pound", type: "Normal", category: "Physical", power: 40, accuracy: 100, pp: 35 },
            { id: 2, name: "Karate Chop", type: "Fighting", category: "Physical", power: 50, accuracy: 100, pp: 25 },
            // ... outros movimentos base
        ];
    }
    
    getMovesByType(type) {
        return Array.from(this.moves.values()).filter(move => move.type === type);
    }
    
    getMovesByCategory(category) {
        return Array.from(this.moves.values()).filter(move => move.category === category);
    }
    
    getRandomMove() {
        const moveIds = Array.from(this.moves.keys());
        const randomId = moveIds[Math.floor(Math.random() * moveIds.length)];
        return this.moves.get(randomId);
    }
}

module.exports = { HackConfiguration, TypeSystem, AbilitySystem, MoveSystem };