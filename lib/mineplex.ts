import * as request from "request";
import * as Promise from "bluebird";

export namespace Mineplex {

  /**
   * Represents an error thrown by the API when statusCode is not 200
   */
  export class APIError implements Error {
    name: string;
    statusCode: number;
    error: string;
    message: string;

    constructor(base) {
      this.name = base["error"];
      this.statusCode = base["statusCode"];
      this.error = base["error"];
      this.message = base["message"] || base["error"];
    }
  }

  /**
   * Represents the most basic form of a Player
   */
  export interface PlayerBase {
    /**
     * The Minecraft username of the Player
     * @type {string}
     */
    name: string;

    /**
     * The UUID of the player. Represented as a String, includes dashes
     * @type {string}
     */
    uuid: string;

  }

  /**
   * Represents the online status of a Player
   */
  export interface Status {
    /**
     * Is the player logged on to Mineplex right now?
     * @type {boolean}
     */
    online: boolean;

    /**
     * The current server the player is connected to. Only present if online
     * is true.
     * @type {string}
     */
    server?: string;
  }

  /**
   * The level information for a player
   */
  export interface Level {
    /**
     * Current level of the player
     * @type {number}
     */
    value: number;
    /**
     * The color for that player's level
     * @type {string}
     */
    color: string;
  }

  /**
   * Represents a Mineplex Player
   */
  export interface Player extends PlayerBase {
    /**
     * Rank of the player
     * @type {string}
     */
    rank: string;

    /**
     * The last time the player logged in to Mineplex
     * @type {Date}
     */
    lastLogin: Date;

    /**
     * The level of the player
     * @type {Level}
     */
    level: Level;

    /**
     * Current login status of the Player
     * @type {Status}
     */
    status: Status;

    /**
     * List of friends with the player
     * @type {Array<PlayerBase>}
     */
    friends: Array<PlayerBase>;

    /**
     * Player stats
     */
    stats: {};
  }

  export class MineplexAPI {
    private baseUrl: string;
    private apiKey: string;

    constructor(apiKey: string, baseUrl?: string) {
      this.baseUrl = baseUrl || "https://api.mineplex.com/pc";
      this.apiKey = apiKey;
    }

    /**
     * Get a specific player
     * @param  {string}          player UUID or name of the player
     * @return {Promise<Player>}        A Promise containing the Player result
     */
    public getPlayer(player: string): Promise<Player> {
      return this.apiCall<Player>(`player/${player}`);
    }

    /**
     * Wrapper method for making an api call
     */
    private apiCall<T>(resource: string): Promise<T> {
      return new Promise<T>((resolve, reject) => {
        request(this.buildUrl(resource), (err, response, body) => {
          if (err || response.statusCode !== 200) {
            reject(err || new APIError(body));
            return;
          }

          resolve(<T>body);
        });
      });
    }

    private buildUrl(resource: string): string {
      return `${this.baseUrl}/${resource}?apiKey=${this.apiKey}`;
    }

  }
}
