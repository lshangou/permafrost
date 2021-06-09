import { Request, Response } from 'express';

export const pageController = {

  render: function(req: any, res: Response, page: string) {
    res.render(page, {user: req.user})
  }

} 
