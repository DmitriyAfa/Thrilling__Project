import { RouteProps } from 'react-router-dom';
// need refactoring
// eslint-disable-next-line dm-fsd-rules/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}