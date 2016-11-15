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
   * ISO format
   * @type string
   */
  lastLogin: string;

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
