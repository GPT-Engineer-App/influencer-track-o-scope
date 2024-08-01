import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";

const fetchInfluencers = async () => {
  // Simulated API call
  return [
    { id: 1, name: 'John Doe', followers: 100000, engagement: 5.2, posts: 500 },
    { id: 2, name: 'Jane Smith', followers: 250000, engagement: 4.8, posts: 750 },
    { id: 3, name: 'Bob Johnson', followers: 50000, engagement: 6.1, posts: 300 },
    { id: 4, name: 'Alice Brown', followers: 500000, engagement: 3.9, posts: 1000 },
    { id: 5, name: 'Charlie Davis', followers: 75000, engagement: 5.5, posts: 400 },
  ];
};

const fetchChartData = async () => {
  // Simulated API call
  return [
    { name: 'Jan', followers: 100000, engagement: 5.2 },
    { name: 'Feb', followers: 120000, engagement: 5.5 },
    { name: 'Mar', followers: 150000, engagement: 5.8 },
    { name: 'Apr', followers: 200000, engagement: 6.0 },
    { name: 'May', followers: 250000, engagement: 5.9 },
  ];
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: influencers = [] } = useQuery({ queryKey: ['influencers'], queryFn: fetchInfluencers });
  const { data: chartData = [] } = useQuery({ queryKey: ['chartData'], queryFn: fetchChartData });

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Influencer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Influencers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{influencers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(influencers.reduce((sum, inf) => sum + inf.followers, 0) / influencers.length).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {(influencers.reduce((sum, inf) => sum + inf.engagement, 0) / influencers.length).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="followers" stroke="#8884d8" />
              <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Influencer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Engagement Rate</TableHead>
                <TableHead>Posts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInfluencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>{influencer.name}</TableCell>
                  <TableCell>{influencer.followers.toLocaleString()}</TableCell>
                  <TableCell>{influencer.engagement}%</TableCell>
                  <TableCell>{influencer.posts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
