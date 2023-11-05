import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductIdsInput {
  @Field(() => [String])
  productIds: string[];
}
