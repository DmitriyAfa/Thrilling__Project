import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOption {
  userId: string;
  features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlagsApi: build.mutation<void, UpdateFeatureFlagsOption>({
      query: ({ userId, features }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          features,
        },
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlagsApi.initiate;
