export default class CardsService {
  private static readonly ENDPOINT = 'http://localhost:5000';

  public static fetchCards = (count: number) =>
    fetch(`${CardsService.ENDPOINT}/cards/${count}`);
}
