module.exports = class AbstractController {
  constructor () {
    if (new.target === AbstractController) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }

  /**
   * Display a listing of the resource.
   */
  async list (req, res) {
    throw new Error('list: Implementation Missing!')
  }
  /**
   * Store a newly created resource in storage.
   */
  async create (req, res) {
    throw new Error('create: Implementation Missing!')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    throw new Error('read: Implementation Missing!')
  }

  /**
   * Update the specified resource in storage.
   *
   */
  async update (req, res, id) {
    throw new Error('update: Implementation Missing!')
  }

  /**
  * Remove the specified resource from storage.
  */
  async destroy (req, res, id) {
    throw new Error('destroy: Implementation Missing!')
  }
}
