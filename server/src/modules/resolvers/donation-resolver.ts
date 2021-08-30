import { Resolver, Query, Mutation, Arg } from 'type-graphql'

@Resolver()
class DonationResolver {
  @Query(() => String)
  donation(): string {
    return 'ok'
  }

  @Mutation(() => String)
  testMutation(@Arg('input') input: string) {
    console.log(input)
    return input
  }
}
export default DonationResolver
