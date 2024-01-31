import { Octokit, App } from "octokit";
import fetch from "node-fetch";


// Octokit.js
// https://github.com/octokit/core.js#readme


  async function createRepo() {
    try {

        const octokit = new Octokit({
            request: {
              fetch: fetch,
            },
            auth: ''
          });


     const org = 'Inteli-College-PoC';
     const teamName = '2024M1T';

     const turmas = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'];
     const grupos = ['G01', 'G02', 'G03', 'G04', 'G05'];
     const professorsEmails = ['jose.romualdo@prof.inteli.edu.br', 'sergio.venancio@prof.inteli.edu.br'];
     const studentsEmails = ['joseromualdo@outlook.com', 'renato.penha@prof.inteli.edu.br'];
          

     //for
   const repo01 =   await octokit.request(`POST /orgs/${org}/repos`, {
        org: 'ORG',
        name: `${teamName}-G01`,
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
  
      console.log('Repository created successfully');

    const repo02 =  await octokit.request(`POST /orgs/${org}/repos`, {
        org: 'ORG',
        name: `${teamName}-G02`,
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
  




      //2024M1T003-G01

      //Time Professores:
      //2024M1T003-PROFESSORS
      // Octokit.js
// https://github.com/octokit/core.js#readme

let teamProf = await octokit.request(`POST /orgs/${org}/teams`, {
    org: 'ORG',
    name: `${teamName}-PROFESSORES`,
    description: `Professor's ${teamName} team`,
    permission: 'push',
    notification_setting: 'notifications_enabled',
    privacy: 'secret',
    //repo_names: [  `${teamName}-G01`, `${teamName}-G02`],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });


  console.log(`Team ${teamProf.data.description} created successfully`);

  const teamG01 = await octokit.request(`POST /orgs/${org}/teams`, {
    org: 'ORG',
    name: `${teamName}-G01`,
    description: `${teamName}-G01`,
    permission: 'push',
    notification_setting: 'notifications_enabled',
    privacy: 'secret',
    //repo_names: [  `${teamName}-G01`],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  console.log(`Team ${teamG01.data.description} created successfully`);

  const teamG02 = await octokit.request(`POST /orgs/${org}/teams`, {
    org: 'ORG',
    name: `${teamName}-G02`,
    description: `${teamName}-G02`,
    permission: 'push',
    notification_setting: 'notifications_enabled',
    privacy: 'secret',
    //repo_names: [  `${teamName}-G02`],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  console.log(`Team ${teamG02.data.description} created successfully`);

const owner  = 'Intelihub';
const repo = repo02.data.name;


await octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
  org: 'ORG',
  team_slug: teamG01.data.slug,
  owner: "Inteli-College-PoC",
  repo: repo,
  permission: 'push',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})


await octokit.request('PUT /teams/{team_id}/repos/{org}/{repo}', {
  org: org,
  team_id: teamG01.data.slug,
  repo: repo,
  username: 'jose.romualdo@prof.inteli.edu.br',
  role: 'maintainer',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

  
  // await octokit.request(`POST /orgs/${org}/invitations`, {
  //   org: 'ORG',
  //   email: 'jose.romualdo@prof.inteli.edu.br',
  //   role: 'direct_member',
  //   team_ids: [
  //     teamG02.data.id
  //   ],
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })

  // const invitationsAndre = await octokit.request(`POST /orgs/${org}/invitations`, {
  //   org: 'ORG',
  //   email: 'andre.leal@inteli.edu.br',
  //   role: 'direct_member',
  //   team_ids: [
  //     teamProf.data.id
  //   ],
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })

  console.log(`User ${invitationsAndre.data.email} invited successfully`);

      //2024M1T003-G01
      //2024M1T003-G02
      //2024M1T003-G03

    } catch (error) {
      console.error('Error creating repository:', error);
    }
  }
  
  createRepo();