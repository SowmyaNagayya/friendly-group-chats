// logic for CRUD functions with group
const { Group } = require('../models');

module.exports = {
  // get all groups for dahsboard
  async getAllGroups(req, res) {
    const allGroups = await Group.find({ });

    if (!allGroups) {
      return res.status(400).json({message: 'No groups found'});
    }
    res.status(200).json(allGroups);
  },

  // create group
  async createGroup({ body }, res) {
    const group = await Group.create(body);

    if (!group) {
      return res.status(400).json({message: 'Unable to create group'});
    }
    res.status(200).json(group);
  },

  // get one group
  async getGroup({ params }, res) {
    const group = await Group.findOne({ _id: params.id });

    if (!group) {
      return res.status(400).json({ message: 'No group found by that id' });
    }
    res.status(200).json(group);
  },

  // update a group This one maybe wrong
  async updateGroup({ body }, res) {
    const group = await Group.findOneAndUpdate(body)

    if (!group) {
      return res.status(400).json({message: 'Unable to create group'});
    }
    res.status(200).json(group);
  },

  // remove group This one maybe wrong
  async removeGroup({ params }, res) {
    const group = await Group.deleteOne({_id: params.id});

    if (!group) {
      return res.status(400).json({message: 'Unable to delete group'});
    }
    res.status(200).json(group);
  }
}