import React from 'react';

export function AuthPage() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-muted-foreground">
        Please sign in to continue
      </p>
      {/* Sign-in button will be added in Chunk 2 */}
    </div>
  );
}

export default AuthPage;
