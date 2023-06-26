import { Request, Response } from 'express';
import Candidate, { ICandidate } from '../models/Candidate';

export const createCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      positionId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      cognitiveTestScore,
      personalityTestScore,
      hasInterview,
      hasReliabilityTest,
      hasTaskPassed,
      hasJobOffer,
      isEmployed,
      totalScore,
    } = req.body;

    const candidate: ICandidate = new Candidate({
      positionId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      cognitiveTestScore,
      personalityTestScore,
      hasInterview,
      hasReliabilityTest,
      hasTaskPassed,
      hasJobOffer,
      isEmployed,
      totalScore,
    });

    const savedCandidate = await candidate.save();
    res.json(savedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the candidate.', error });
  }
};

export const updateCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      positionId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      cognitiveTestScore,
      personalityTestScore,
      hasInterview,
      hasReliabilityTest,
      hasTaskPassed,
      hasJobOffer,
      isEmployed,
      totalScore,
    } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        positionId,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        cognitiveTestScore,
        personalityTestScore,
        hasInterview,
        hasReliabilityTest,
        hasTaskPassed,
        hasJobOffer,
        isEmployed,
        totalScore,
      },
      { new: true }
    );

    if (!candidate) {
       res.status(404).json({ message: 'Candidate not found.' });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the candidate.', error });
  }
};

export const getCandidates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the candidates.', error });
  }
};

export const getCandidateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
       res.status(404).json({ message: 'Candidate not found.' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the candidate.', error });
  }
};

export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
       res.status(404).json({ message: 'Candidate not found.' });
    }
    res.json({ message: 'Candidate deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the candidate.', error });
  }
};
