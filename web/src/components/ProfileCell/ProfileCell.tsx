import type {
  FindProfileQuery,
  FindProfileQueryVariables,
} from "types/graphql";

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";

export const QUERY: TypedDocumentNode<
  FindProfileQuery,
  FindProfileQueryVariables
> = gql`
  query FindProfileQuery($id: Int!) {
    profile: profile(id: $id) {
      id
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindProfileQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  profile,
}: CellSuccessProps<FindProfileQuery, FindProfileQueryVariables>) => {
  return <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Manage your profile settings</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="avatar">Avatar</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarSrc} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="w-full" />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={handleNameChange} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button type="submit" onClick={handleSubmit}>Save changes</Button>
    </CardFooter>
  </Card>
};
