const fs = require("fs");
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../lib/animals.js");
const { animals } = require("../data/animals");

jest.mock('fs');

test("filters by query", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
          },
          {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
          },
        ];
    
    const updatedAnimals = filterByQuery({species: "gorilla"}, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

test("finds animal by id", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
          },
          {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
          },
        ];

    const result = findById("4", startingAnimals);

    expect(result.name).toBe("Noel");
});

test("creates an animal object", () => {
    const animal = createNewAnimal({ name: "Chuck", id: "1383" }, animals);

    expect(animal.name).toBe("Chuck");
    expect(animal.id).toBe("1383");
});

test("validates animal data entry", () => {
    const validAnimal = 
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        };
    
    const invalidAnimal = 
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore"
        };

    expect(validateAnimal(validAnimal)).toBeTruthy();
    expect(validateAnimal(invalidAnimal)).toBeFalsy();
});
