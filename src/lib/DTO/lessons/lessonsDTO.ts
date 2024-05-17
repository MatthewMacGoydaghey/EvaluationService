import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class LessonDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  code: string
}