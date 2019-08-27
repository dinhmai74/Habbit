/**
 * NOTE TO DEVS:
 *
 * Spacing should consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - 4 elements contextually close to each other
 * 2 = smaller - 8 for groups of closely related items or perhaps borders
 * 3 = small   - 12
 * 4 = medium  - 16
 * 5 = medium+ - 24 side padding
 * 6 = large   - 32 between groups of content that aren't related?
 * 7 = huge    - 48
 * 8 = massive - 64 an uncomfortable amount of whitespace
 * 9 = giant   - 128
 */
export const spacing: number[] = [0, 4, 8, 12, 16, 24, 32, 48, 64, 128]
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
