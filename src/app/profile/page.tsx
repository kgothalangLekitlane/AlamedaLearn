
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Mail, Briefcase, Edit3, Loader2, MapPin } from 'lucide-react'; // Added MapPin
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import VideoUploadForm from './VideoUploadForm'; 

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading, logout, login } = useAuth(); // Added login to update context
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable profile fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Email usually not editable
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState(''); // New
  const [province, setProvince] = useState(''); // New
  const [city, setCity] = useState(''); // New

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
    if (user) {
        setName(user.name);
        setEmail(user.email);
        setBio(user.bio || (user.isTutor ? 'Passionate educator ready to share knowledge.' : 'Eager learner exploring new subjects.'));
        setCountry(user.country || ''); // New
        setProvince(user.province || ''); // New
        setCity(user.city || ''); // New
    }
  }, [isLoggedIn, isLoading, router, user]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if(user) {
        const updatedUser = {
            ...user,
            name,
            bio,
            country: country || undefined,
            province: province || undefined,
            city: city || undefined,
        };
        login(updatedUser); // Update user in AuthContext and localStorage
        console.log("Updating profile:", updatedUser);
    }
    setIsEditing(false);
  };

  const locationString = [user.city, user.province, user.country].filter(Boolean).join(', ');

  return (
    <div className="container mx-auto py-8 space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">My Profile</h1>
        <p className="text-muted-foreground text-lg">View and manage your account details.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <Card className="md:col-span-1 shadow-xl">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
              <AvatarImage src={user.profilePictureUrl || `https://picsum.photos/seed/${user.id}/200`} data-ai-hint="profile avatar" alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className={`capitalize font-medium ${user.isTutor ? 'text-success' : 'text-accent'}`}>
              {user.isTutor ? 'Tutor Account' : 'Student Account'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            {user.bio && (
               <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}
            {locationString && (
                 <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{locationString}</p>
                </div>
            )}
             <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="w-full mt-4">
                <Edit3 className="mr-2 h-4 w-4" /> {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </CardContent>
        </Card>

        {/* Profile Editing / Video Upload Section */}
        <div className="md:col-span-2 space-y-8">
          {isEditing && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Edit Your Profile</CardTitle>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="profileName">Full Name</Label>
                        <Input id="profileName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="profileEmail">Email (Cannot be changed)</Label>
                        <Input id="profileEmail" value={email} disabled />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profileBio">Bio</Label>
                        <Textarea id="profileBio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} 
                        placeholder={user.isTutor ? "Tell us about your teaching experience and expertise." : "A little about yourself."}/>
                    </div>
                    <h3 className="text-md font-semibold text-muted-foreground pt-3 border-t">Location (Optional)</h3>
                     <div className="space-y-1">
                        <Label htmlFor="profileCountry">Country</Label>
                        <Input id="profileCountry" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g., South Africa" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="profileProvince">Province/State</Label>
                            <Input id="profileProvince" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="e.g., Gauteng" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="profileCity">City</Label>
                            <Input id="profileCity" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Johannesburg" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {user.isTutor && !isEditing && (
            <VideoUploadForm />
          )}
          
          {user.isTutor && (
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl text-primary">My Uploaded Videos</CardTitle>
                    <CardDescription>A list of videos you have uploaded.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        (Feature coming soon) Your uploaded videos will appear here.
                    </p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

