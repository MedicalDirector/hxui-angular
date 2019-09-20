import { TabularSortByService } from './tabular-sort-by.service';
import { TabularComponent } from './tabular.component';
import { Context } from '../enums';

describe('TabularComponent', () => {

    let tabularComponent: TabularComponent;
    let sortByServiceMock;

    beforeEach(() => {
        sortByServiceMock = jasmine.createSpyObj('TabularSortByService', ['sortBy']);
        tabularComponent = new TabularComponent(null, sortByServiceMock);
    });

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
            const tooltip = tabularComponent.getTooltipInfo(contentWithTooltip);

            expect(tooltip).toEqual(contentWithTooltip.tooltip);
        });

        it('returns tooltip with config set as disabled when content does not contain tooltip configuration', () => {
            const content = 'This is the data to be displayed on the cell';
            const tooltip = tabularComponent.getTooltipInfo(content);

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
            const cellValue = tabularComponent.getCellValue(contentWithTooltip);

            expect(cellValue).toBe(contentWithTooltip.content);
        });

        
        it('returns the content when data does not contain tooltip configuration', () => {
            const content = new Date(2019, 10, 21);
            const cellValue = tabularComponent.getCellValue(content);

            expect(cellValue).toBe(content);
        });
    });

});
