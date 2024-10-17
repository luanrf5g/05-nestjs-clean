import { Module } from '@nestjs/common'

import { BcryptHaser } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptHaser },
    { provide: HashComparer, useClass: BcryptHaser },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
