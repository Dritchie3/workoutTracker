const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        execises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter Exrecise Type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter Exercise Name"
                },
                duration: {
                    type: Number,
                    required: "Enter Exercise Duration in Minutes"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            // includes virtual properties when data is requested
            virtuals: true
        }
    }
);
// reduce dynamically created property of schema to the sum of thier durations
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;