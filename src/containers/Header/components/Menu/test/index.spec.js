import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../index';

let source = [];
beforeEach(() => {
  source = [
    {
      id: 11,
      parent_id: null,
      title: 'Edu School',
      slug: 'Edu-School',
      color: '#52c41a',
      description: 'Giáo dục thời 4.0',
      status: '1',
      image: '/uploads/coursecategory/Lĩnh vực1581496679053.png',
      created_at: '2020-02-12 08:37:59',
      updated_at: '2020-03-01 07:36:51',
      childrens: [
        {
          id: 8,
          parent_id: 11,
          title: 'Tiểu Học',
          slug: 'tieu-hoc',
          color: '#ff00fe',
          description: 'Tiểu Học',
          status: '1',
          image: "/uploads/coursecategory/VUCONGTRUONG 's course1575213379852.jpeg",
          created_at: '2019-12-01 22:16:19',
          updated_at: '2020-02-17 09:17:51'
        }
      ]
    }
  ];
});

describe('Header > components > Menu', () => {
  const component = renderer.create(<Index source={source} />);
  const instance = component.getInstance();
  it('should match the snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should call showMenu function ', () => {
    instance.showMenu(source);
  });
});
