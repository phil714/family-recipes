import type {
  QueryResolvers,
  MutationResolvers,
  FamilyMemberRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const familyMembers: QueryResolvers["familyMembers"] = ({ familyId }) => {
  return db.familyMember.findMany({ where: { familyId } });
};

export const familyMember: QueryResolvers["familyMember"] = ({ id }) => {
  return db.familyMember.findUnique({
    where: { id },
  });
};

export const updateFamilyMember: MutationResolvers["updateFamilyMember"] = ({
  id,
  input,
}) => {
  return db.familyMember.update({
    data: input,
    where: { id },
  });
};

export const deleteFamilyMember: MutationResolvers["deleteFamilyMember"] = ({
  id,
}) => {
  return db.familyMember.delete({
    where: { id },
  });
};

export const FamilyMember: FamilyMemberRelationResolvers = {
  family: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).family();
  },
  user: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).user();
  },
  recipes: (_obj, { root }) => {
    return db.familyMember.findUnique({ where: { id: root?.id } }).recipes();
  },
};
