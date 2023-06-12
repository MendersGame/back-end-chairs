const { Chair } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const chair = await Chair.findAll()
    res.json(chair)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const chair = await Chair.findByPk(req.params.id)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    chair.photo = image.url
    await chair.save()
    res.status(201).json(chair.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createChair(req, res) {
  try {
    req.body.profileId = req.user.profile.id
    const chair = await Chair.create(req.body)
    res.status(200).json(chair)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateChair(req, res) {
  try {
    const updatedChair = await Chair.findByPk(req.params.chairId)
    updatedChair.set(req.body)
    await updatedChair.save()
    res.status(200).json(updatedChair)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteChair(req, res) {
  try {
    const deletedChair = await Chair.findByPk(req.params.chairId)
    await deletedChair.destroy()
    res.status(200).json(deletedChair)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { index, addPhoto, createChair, updateChair, deleteChair }
