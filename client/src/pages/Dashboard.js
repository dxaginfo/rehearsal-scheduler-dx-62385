import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Avatar,
  Alert
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  Event as EventIcon,
  Groups as GroupsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Mock data for development
const mockUpcomingRehearsals = [
  {
    id: '1',
    title: 'Weekly Practice',
    bandName: 'The Rhythm Section',
    start: new Date(Date.now() + 86400000), // tomorrow
    location: 'Studio A',
    attendanceStatus: 'attending',
  },
  {
    id: '2',
    title: 'Pre-gig Rehearsal',
    bandName: 'The Rhythm Section',
    start: new Date(Date.now() + 172800000), // day after tomorrow
    location: 'Main Hall',
    attendanceStatus: 'maybe',
  },
  {
    id: '3',
    title: 'New Song Practice',
    bandName: 'Jazz Ensemble',
    start: new Date(Date.now() + 259200000), // 3 days from now
    location: 'Studio B',
    attendanceStatus: 'not_attending',
  }
];

const mockBands = [
  {
    id: '1',
    name: 'The Rhythm Section',
    role: 'leader',
    memberCount: 5
  },
  {
    id: '2',
    name: 'Jazz Ensemble',
    role: 'member',
    memberCount: 8
  }
];

// Helper function to format dates
const formatDate = (date) => {
  const options = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  return date.toLocaleString('en-US', options);
};

// Status chip component for rehearsal attendance
const AttendanceChip = ({ status }) => {
  const theme = useTheme();
  
  let color, icon, label;
  
  switch(status) {
    case 'attending':
      color = 'success';
      icon = <CheckCircleIcon />;
      label = 'Attending';
      break;
    case 'not_attending':
      color = 'error';
      icon = <CancelIcon />;
      label = 'Not Attending';
      break;
    case 'maybe':
    default:
      color = 'warning';
      icon = <HelpOutlineIcon />;
      label = 'Maybe';
  }
  
  return (
    <Chip 
      icon={icon}
      label={label}
      color={color}
      size="small"
      sx={{ fontWeight: 'medium' }}
    />
  );
};

const Dashboard = () => {
  const theme = useTheme();
  // In a real app, these would come from API calls
  const [upcomingRehearsals, setUpcomingRehearsals] = useState(mockUpcomingRehearsals);
  const [bands, setBands] = useState(mockBands);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Simulate API call
  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // If there was an error, you would set it here
      // setError('Could not fetch rehearsals');
    }, 500);
  }, []);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Welcome to Rehearsal Scheduler
            </Typography>
            <Typography variant="body1" paragraph>
              Organize your band rehearsals, track attendance, and find the perfect practice times.
            </Typography>
            <Box display="flex" gap={2}>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link} 
                to="/rehearsals/schedule"
                startIcon={<EventIcon />}
              >
                Schedule Rehearsal
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white' }}
                component={Link} 
                to="/bands/create"
                startIcon={<AddIcon />}
              >
                Create Band
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Upcoming Rehearsals */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              height: '100%'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Upcoming Rehearsals
              </Typography>
              <Button 
                component={Link} 
                to="/rehearsals/schedule" 
                size="small" 
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </Box>
            
            {loading ? (
              <Typography variant="body2" color="textSecondary">
                Loading rehearsals...
              </Typography>
            ) : upcomingRehearsals.length > 0 ? (
              <List>
                {upcomingRehearsals.map((rehearsal, index) => (
                  <React.Fragment key={rehearsal.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ListItem 
                      alignItems="flex-start"
                      component={Link}
                      to={`/rehearsals/${rehearsal.id}`}
                      sx={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <MusicNoteIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={rehearsal.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {rehearsal.bandName}
                            </Typography>
                            {" — "}
                            {formatDate(rehearsal.start)}
                            {rehearsal.location && ` • ${rehearsal.location}`}
                            <Box mt={1}>
                              <AttendanceChip status={rehearsal.attendanceStatus} />
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No upcoming rehearsals. Schedule one now!
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Your Bands */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              height: '100%'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Your Bands
              </Typography>
              <Button 
                component={Link} 
                to="/bands/create" 
                size="small" 
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </Box>
            
            {loading ? (
              <Typography variant="body2" color="textSecondary">
                Loading bands...
              </Typography>
            ) : bands.length > 0 ? (
              <Grid container spacing={2}>
                {bands.map((band) => (
                  <Grid item xs={12} key={band.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" component="h3">
                          {band.name}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <GroupsIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                            {band.memberCount} members
                          </Typography>
                        </Box>
                        <Chip 
                          label={band.role} 
                          size="small"
                          color={band.role === 'leader' ? 'primary' : 'default'}
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          component={Link} 
                          to={`/bands/${band.id}`}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary">
                You haven't joined any bands yet. Create one now!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;