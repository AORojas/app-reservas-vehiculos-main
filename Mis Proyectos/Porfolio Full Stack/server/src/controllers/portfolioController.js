import { portfolioData } from "../data/portfolio.js";

export const getPortfolio = async (_req, res) => {
  res.json(portfolioData);
};

