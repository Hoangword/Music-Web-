export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface Playlist {
    id: number;
    name: string;
    creator: string;
    tracks: number;
    status: 'public' | 'private';
    createdAt: string;
}

export interface Track {
    id: number;
    name: string;
    artist: string;
    album: string;
    duration: string;
    addedAt: string;
}

export interface Favorite {
    user: string;
    song: string;
    artist: string;
    favoriteAt: string;
}

export interface History {
    user: string;
    song: string;
    artist: string;
    playedAt: string;
    device: string;
}