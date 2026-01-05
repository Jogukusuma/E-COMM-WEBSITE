// This is a server-side file!
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 * 
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('A list of product IDs representing the user browsing history.'),
  cartContents: z
    .array(z.string())
    .describe('A list of product IDs currently in the user cart.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe(
      'A list of product IDs that are recommended to the user based on their browsing history and cart contents.'
    ),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a product recommendation expert for an online computer and hardware store. Based on the user's browsing history and current cart contents, recommend related or complementary products.

Browsing History: {{#if browsingHistory.length}}{{{browsingHistory}}}{{else}}None{{/if}}
Cart Contents: {{#if cartContents.length}}{{{cartContents}}}{{else}}None{{/if}}

Recommend products that the user might be interested in, returning only a list of product IDs.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
