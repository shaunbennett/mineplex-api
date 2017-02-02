/**
 * This interface represents a Mineplex Game Amplifier. These amplifiers are
 * activated by players and used to boost rewards in the game for a set time
 *
 * Amplifiers are one of the few features that are not region specific. Any
 * activated amplifiers apply on both EU servers and US servers.
 */
export interface Amplifier {
  /**
   * The player that activated this amplifier
   * @type {string}
   */
  playerName: string;

  /**
   * The Mojang UUID of the player that activated this amplifier
   * @type {string}
   */
  uuid: string;

  /**
   * The duration of this amplifier (in seconds)
   * @type {number}
   */
  duration: number;

  /**
   * The time the amplifier was activated (ISO 8601 String)
   * @type {string}
   */
  activationTime: string;

  /**
   * The multiplier of this amplifier (typically 2)
   * @type {number}
   */
  mutliplier: number;

  /**
   * The time this amplifier started or will start (ISO 8601 String)
   * @type {string}
   */
  startTime: string;

  /**
   * The time this amplifier will end (ISO 8601 String)
   * @type {string}
   */
  endTime: string;
}
