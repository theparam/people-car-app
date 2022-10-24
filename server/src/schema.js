import { gql } from 'apollo-server-express'
import { find, remove, filter } from 'lodash'
import { people, cars } from './peopleCarsScheme'

const typeDefs = gql`
  type People {
    id: String!
    firstName: String
    lastName: String
    cars: [String]
  }

  type Cars {
    id: String!
    year: Int
    make: String
    model: String
    price: Float
    personId: String
  }

  type PersonWithCars {
    id: String!
    firstName: String
    lastName: String
    cars: [Cars]
  }

  type Query {
    person(id: String!): People
    people: [People]
    car(id: String!): Cars
    carsByPersonId(personId: String!): [Cars]
    cars: [Cars]
  }

  type Mutation {
    addPerson(id: String, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String, lastName: String): People
    removePerson(id: String!): People
    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
    removeCar(id: String!): Cars
  }
`

const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id })
    },

    cars: () => cars,
    car(parent, args, context, info) {
      return find(cars, { id: args.id })
    },
    carsByPersonId(parent, args, context, info) {
      return filter(cars, { personId: args.personId })
    }
  },
  Mutation: {
    addPerson(root, args) {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      people.push(newPerson)

      return newPerson
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id })
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      remove(cars, (car) => car.personId === args.id)

      remove(people, { id: args.id })

      return removedPerson
    },
    addCar(root, args) {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      }

      cars.push(newCar)

      return newCar
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      car.year = args.year
      car.make = args.make
      car.model = args.model
      car.price = args.price
      car.personId = args.personId

      return car
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      remove(cars, { id: args.id })

      return removedCar
    }
  }
}

export { typeDefs, resolvers }
