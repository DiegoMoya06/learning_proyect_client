import {Box, Button, Card, CardContent, CardHeader, Input, Typography} from "@mui/material";

export default function Login() {

    return (
        <Box className="flex min-h-screen items-center justify-center bg-purple-50/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        Sign In
                    </Typography>
                    {/*<CardTitle className="text-center text-2xl"></CardTitle>*/}
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(_e) => {
                            // e.preventDefault()
                            // handleSubmit(formData)
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={''}
                                onChange={() => {}}
                                required
                                placeholder="Enter your email"
                                className={/*'errors.email'*/ 1 ? 'border-red-500' : ''}
                            />
                            {/*'errors.email'*/ 1 && <p className="text-sm text-red-500">{'errors.email'}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={'formData.password'}
                                onChange={() => {}}
                                required
                                placeholder="Enter your password"
                                className={/*'errors.password'*/ 1 ? 'border-red-500' : ''}
                            />
                            {/*'errors.password'*/ 1 && <p className="text-sm text-red-500">{'errors.password'}</p>}
                        </div>
                        {/*'errors.submit'*/ 1 && <p className="text-center text-sm text-red-500">{'errors.submit'}</p>}
                        <Button type="submit" className="w-full" disabled={/*'isSubmitting'*/ 1 === 1}>
                            {/*'isSubmitting'*/ 1 ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <Box className="text-center text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-purple-600 hover:text-purple-500">
                                Sign up
                            </a>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}