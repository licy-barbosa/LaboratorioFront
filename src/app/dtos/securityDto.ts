export interface credentialsUserDto{
    email: string;
    Password: string;
}

export interface authenticationResponseDto{
    token: string;
    expiration: Date;
}

export interface userDto{
    email: string;
}