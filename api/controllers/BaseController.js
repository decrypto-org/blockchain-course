const AbstractController = require('./AbstractController')
const { HTTPError } = require('../errors')

module.exports = class BaseController extends AbstractController {
  constructor (model, key, singular) {
    super()
    this.model = model
    this.key = key
    this.singular = singular
  }

  /**
   * Display a listing of the resource.
   */
  async list (req, res, options = {}) {
    const data = await this.model.findAll({ ...options })
    return res.status(200).send(
      {
        success: true, [this.key]: data
      }
    )
  }
  /**
   * Store a newly created resource in storage.
   */
  async create (req, res) {

  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const data = await this.model.findById(id)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(data)

    return res.status(200).json(
      {
        success: true, [this.singular]: [{ ...data.dataValues }]
      }
    )
  }

  /**
   * Update the specified resource in storage.
   *
   */
  async update (req, res, id) {

  }

  /**
  * Remove the specified resource from storage.
  */
  async destroy (req, res, id) {

  }

  requireResourceFound (resource) {
    if (resource === null) {
      throw new HTTPError(404, `${this.singular} not found`)
    }

    return resource
  }
}
