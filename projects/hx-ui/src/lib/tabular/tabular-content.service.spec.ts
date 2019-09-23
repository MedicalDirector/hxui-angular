import { Context } from '../enums';
import { TabularContentService } from './tabular-content.service';

describe('TabularContentService', () => {

    let tabularContent = new TabularContentService();


    describe('getTooltipInfo', () => {
        it('returns tooltip when data contains tooltip configuration and content', () => {
            const contentWithTooltip = {
                tooltip: {
                    config: {
                        placement: 'top',
                        disabled: false,
                        context: Context.White,
                        maxWidth: 500
                    },
                    content: 'This is a test tooltip'
                },
                content: 'This is the data to be displayed on the cell'
            };
            const tooltip = tabularContent.getTooltipInfo(contentWithTooltip);

            expect(tooltip).toEqual(contentWithTooltip.tooltip);
        });

        it('returns tooltip with config set as disabled when content does not contain tooltip configuration', () => {
            const content = 'This is the data to be displayed on the cell';
            const tooltip = tabularContent.getTooltipInfo(content);

            expect(tooltip.config.disabled).toBeTruthy();
        });
    });



    describe('getCellValue', () => {
        it('returns the content when data contains tooltip configuration', () => {
            const contentWithTooltip = {
                tooltip: {
                    config: {
                        placement: 'top',
                        disabled: false,
                        context: Context.White,
                        maxWidth: 500
                    },
                    content: 'This is a test tooltip'
                },
                content: 'This is the data to be displayed on the cell'
            };
            const cellValue = tabularContent.getContent(contentWithTooltip);

            expect(cellValue).toBe(contentWithTooltip.content);
        });

        
        it('returns the content when data does not contain tooltip configuration', () => {
            const content = new Date(2019, 10, 21);
            const cellValue = tabularContent.getContent(content);

            expect(cellValue).toBe(content);
        });
    });

});
