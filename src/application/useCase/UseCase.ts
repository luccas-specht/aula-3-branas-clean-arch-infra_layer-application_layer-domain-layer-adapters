export default interface UseCase<
  Input extends unknown,
  Output extends unknown
> {
  execute(input: Input): Promise<Output>;
}
