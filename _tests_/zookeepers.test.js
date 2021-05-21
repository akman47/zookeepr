const fs = require("fs");
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("filters by query", () => {
    const startingKeepers = [
        {
            id: "1",
            name: "Salzy",
            age: 3,
            favoriteAnimal: "hippo"
        },
        {
            id: "5",
            name: "Robyn",
            age: 35,
            favoriteAnimal: "bear"
        }
    ];

    const updatedKeepers = filterByQuery({age: 3}, startingKeepers);
    
    expect(updatedKeepers.length).toEqual(1);
});

test("finds zookeeper by id", () => {
    const startingKeepers = [
        {
            id: "1",
            name: "Salzy",
            age: 3,
            favoriteAnimal: "hippo"
        },
        {
            id: "5",
            name: "Robyn",
            age: 35,
            favoriteAnimal: "bear"
        }
    ];

    const updatedKeeper = findById("5", startingKeepers);

    expect(updatedKeeper.name).toBe("Robyn");
});

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper({ name: "Shroomy", age: 5 }, zookeepers);

    expect(zookeeper.name).toBe("Shroomy");
    expect(zookeeper.age).toBe(5);
});

test("validates zookeeper data entry", () => {
    const validKeeper = 
        {
            id: "5",
            name: "Bob",
            age: 15,
            favoriteAnimal: "tiger"
        };
    
    const invalidKeeper =
        {
            id: "5",
            age: 15,
            favoriteAnimal: "tiger"
        };

    expect(validateZookeeper(validKeeper)).toBeTruthy();
    expect(validateZookeeper(invalidKeeper)).toBeFalsy();
});