import { Request, Response } from 'express';

export const pageController = {

  render: function(req: Request, res: Response, page: string) {
    res.render(page)
  }

} 
