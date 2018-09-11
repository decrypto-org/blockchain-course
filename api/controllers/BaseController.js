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
  async list (req, res) {
    const data = await this.model.findAll()
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
    try {
      const data = await this.model.findById(id)
      if (data === null) {
        return res.status(404).send({ success: false, msg: `${this.singular} not found` })
      }

      return res.status(200).send(
        {
          success: true, [this.singular]: [{ ...data.dataValues }]
        }
      )
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
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
