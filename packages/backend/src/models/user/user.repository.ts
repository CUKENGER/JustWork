import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      // include: {
      //   roles: {
      //     include: {
      //       role: true,
      //     },
      //   },
      // },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      // include: {
      //   roles: true,
      // },
    });
  }

  async findMany() {
    return await this.prisma.user.findMany({
      // include: {
      //   roles: true,
      //   likedAlbums: true,
      //   likedArtists: true,
      //   likedTracks: true,
      //   listenedTracks: true,
      // },
    });
  }

  async deleteExpired() {
    return await this.prisma.user.deleteMany({
      // where: {
      //   isActivated: false,
      //   activationExpiresAt: { lt: new Date() },
      // },
    });
  }

  async findByActivationLink(_activationLink: string) {
    return await this.prisma.user.findFirst({
      // where: {
      //   activationLink,
      //   activationExpiresAt: {
      //     gte: new Date(),
      //   },
      // },
    });
  }
}
