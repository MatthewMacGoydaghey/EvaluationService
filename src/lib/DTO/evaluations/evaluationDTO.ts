import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class EvaluationDTO {
  @ApiProperty()
  @IsNumber()
  user_id: number

  @ApiProperty()
  @IsNumber()
  score: number
}