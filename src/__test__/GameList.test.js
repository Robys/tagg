import React from 'react'
import {act} from 'react-dom/test-utils'
import {shallow} from '../enzyme'
import GameList from '../components/GamesList'

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });


  describe("testing <GameList/>",()=>{

    test("fetching game list", async ()=>{
        const container = shallow(<GameList />)

        await whenStable()
        expect(container.find("#games-list")).toBeTruthy()
        expect(container).toMatchSnapshot()

    })

})