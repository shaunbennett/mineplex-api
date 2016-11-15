import * as request from "request";
import * as Promise from "bluebird";

// Mineplex Libraries
import * as player from "./player";
import * as network from "./network";

export type Callback<T> = (err, res: T) => void;

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

export class MineplexAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.baseUrl = baseUrl || "https://api.mineplex.com/pc";
    this.apiKey = apiKey;
  }

  /**
   * PLAYER ENDPOINTS !
   */

  /**
   * Get a specific player
   * @param  {string}          player UUID or name of the player
   * @return {Promise<Player>}        A Promise containing the Player result
   */
  public getPlayer(player: string, callback?: Callback<player.Player>) {
    return this.apiCall<player.Player>(`player/${player}`, callback);
  }

  public getPlayerStatus(player: string, callback?: Callback<player.Status>) {
    return this.apiCall<player.Status>(`player/${player}/status`, callback);
  }

  public getPlayerFriends(player: string, callback?: Callback<Array<player.PlayerBase>>) {
    return this.apiCall<Array<player.PlayerBase>>(`player/${player}/friends`, callback);
  }

  /**
   * NETWORK ENDPOINTS !
   */

  public getNetworkStatus(callback?: Callback<network.NetworkStatus>) {
    return this.apiCall<network.NetworkStatus>(`network`, callback);
  }

  public getRegionStatus(region: network.Region, callback?: Callback<network.RegionStatus>) {
    return this.apiCall<network.RegionStatus>(`network/${region}`, callback);
  }

  public getServerStatus(region: network.Region, server: string, callback?: Callback<network.MinecraftServer>) {
    return this.apiCall<network.MinecraftServer>(`network/${region}`, callback);
  }

  /**
   * Wrapper method for making an api call
   */
  private apiCall<T>(resource: string, callback?: Callback<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request({ url: this.buildUrl(resource), json: true }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          reject(err || new APIError(body));
          return;
        }

        resolve(body);
      });
    }).asCallback(callback);
  }

  private buildUrl(resource: string): string {
    return `${this.baseUrl}/${resource}?apiKey=${this.apiKey}`;
  }
}

// Export the Mineplex libraries
export * from "./player";
export * from "./network";
