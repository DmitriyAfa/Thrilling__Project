import { EditableProfileCard } from "@/features/EditableProfileCard";
import { TestProvider } from '../../src/shared/lib/tests/ComponentRender/ComponentRender'

const USER_ID = '1';

describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' })
    /*
     Чтобы каждый раз не указывать обертку TestProvider, можно в папке с 
     командами (commands.ts) переопределить метод mount с помощью overwrite или написать свой метод
     где внутри будем добавлять обертку TestProvider.
    */
    cy.mount(
      <TestProvider
        options={{
          initialState: {
            user: {
              authData: {
                id: USER_ID
              }
            }
          }
        }}
      >
        <EditableProfileCard id={USER_ID} />
      </TestProvider>
    )
  });
});