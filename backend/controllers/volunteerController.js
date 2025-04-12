import VolunteerRequestModel from "../models/VolunteerRequestModel.js";
import ngoModel from "../models/ngoModel.js";

const apply = async (req, res) => {
    const { userId, ngoId, appliedFor } = req.body;

    try {
      const ngo = await ngoModel.findById(ngoId);
      if (!ngo || !ngo.volunteers_needed) {
        return res.status(400).json({ success: false, message: 'This NGO is not accepting volunteers.' });
      }
  
      const alreadyApplied = await VolunteerRequestModel.findOne({ userId, ngoId });
      if (alreadyApplied) {
        return res.status(400).json({ success: false, message: 'You have already applied.' });
      }
  
      const request = new VolunteerRequestModel({ userId, ngoId, appliedFor });
      await request.save();
  
      res.json({ success: true, message: 'Request submitted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
}

export {apply};