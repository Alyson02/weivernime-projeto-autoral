import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createAnalise(userId: number) {
  return await prisma.analise.create({
    data: {
      userId,
      animeName: faker.name.firstName(),
      animeId: faker.datatype.number({ min: 1 }),
      texto: faker.lorem.lines(4),
      notaAbertura: faker.datatype.number({ min: 0, max: 10 }),
      notaGeral: faker.datatype.number({ min: 0, max: 10 }),
      imageUrl: faker.image.imageUrl(),
    },
  });
}

export function createAnaliseValidBody() {

  return {
    animeName: faker.name.firstName(),
    animeId: faker.datatype.number({ min: 1 }),
    texto: faker.lorem.lines(4),
    notaAbertura: faker.datatype.number({ min: 0, max: 10 }),
    notaGeral: faker.datatype.number({ min: 0, max: 10 }),
    imageUrl: faker.image.imageUrl(),
    episodios: Array()
  }

}

export function createAnaliseInvalidBody() {
  return {
    animeName: faker.name.firstName(),
    animeId: faker.datatype.number({ min: 1 }),
    imageUrl: faker.image.imageUrl(),
    episodios: Array()
  }
}

export function createAnaliseSomeAnimeKey(animeId: number) {
  return {
    animeId,
    animeName: faker.name.firstName(),
    texto: faker.lorem.lines(4),
    notaAbertura: faker.datatype.number({ min: 0, max: 10 }),
    notaGeral: faker.datatype.number({ min: 0, max: 10 }),
    imageUrl: faker.image.imageUrl(),
    episodios: Array()
  }
}

export function createInvalidBodyLikeOrDislike() {
  return {

  }
}

export function createValidBodyLikeOrDislike() {

  return {
    liked: true
  }

}
