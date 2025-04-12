import mongoose from 'mongoose';

const VolunteerRequestSchema = new mongoose.Schema({
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'ngo', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    appliedFor: { type: String, required: true }, // E.g. "Teaching Program"
    appliedOn: { type: Date, default: Date.now },
});
  
const VolunteerRequestModel = mongoose.model('volunteer_request',VolunteerRequestSchema);
export default VolunteerRequestModel;