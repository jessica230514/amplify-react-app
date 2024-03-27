import React, { useState, useEffect } from 'react';
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button, Heading, View, Card } from "@aws-amplify/ui-react";
import axios from 'axios';

function App({ user, signOut }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) {
      callLambdaAPI();
    }
  }, [user]);

  function callLambdaAPI() {
    const apiEndpoint = 'https://gmvnr8jlj3.execute-api.us-east-1.amazonaws.com/default/nsjac-HelloWorldFunction-wb23HT9T4pb0';
    axios.get(apiEndpoint)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('Error calling from Lambda: ', error);
      });
  }

  return (
    <View className="App">
      <Card>
        <Heading level={1}>Data from Lambda!</Heading>
        {data && (
          <div>
          <div>
            
          </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Track Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Artist Names</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Streams</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Duration (ms)</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.track_name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.artist_names}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.streams}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{item.duration_ms}</td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
