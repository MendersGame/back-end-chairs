const { Vote, Chair } = require('../models')

async function castVote(req, res) {
  try {
    req.body.voterId = req.user.chair.id
    const prevVote = await Vote.findOne({
      where: {
        voterId: req.body.voterId,
        chairId: req.body.chairId,
      }
    })
    if (prevVote) {
      prevVote.value = req.body.value
      await prevVote.save()
    } else {
      await Vote.create(req.body)
    }
    const chair = await Chair.findByPk(
      req.body.chairId,
      { include: [{ model: Vote, as: "votesReceived" }] }
    )
    res.status(200).json(chair)
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error })
  }
}

module.exports = {
  castVote
}