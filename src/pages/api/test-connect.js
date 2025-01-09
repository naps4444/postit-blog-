import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get((req, res) => {
  res.status(200).json({ message: 'next-connect is working!' });
});

export default handler;
