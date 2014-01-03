/*
	五個人中，有2個人看過電影A，3個人看過電影B，五個人看過電影C
	xiao看過ABC buzz看過C dog看過BC flyc看過AC koi看過BC
	ABC
	BC
	BC
	AC
	C
*/

public class Algo{

	
	public static void main (String[] args){
		//movie two dimension array, first is movie name ,second is viewer;
		String movielist[][]= new String[11][2];
		movielist[0][0]="??";//方便計算
		movielist[0][1]="??";
		movielist[1][0]="A";  
		movielist[1][1]="xiao";
		movielist[2][0]="A";
		movielist[2][1]="flyc";
		movielist[3][0]="B";
		movielist[3][1]="xiao";
		movielist[4][0]="B";
		movielist[4][1]="dog";
		movielist[5][0]="B";
		movielist[5][1]="koi";
		movielist[6][0]="C";
		movielist[6][1]="xiao";
		movielist[7][0]="C";
		movielist[7][1]="buzz";
		movielist[8][0]="C";
		movielist[8][1]="dog";
		movielist[9][0]="C";
		movielist[9][1]="flyc";
		movielist[10][0]="C";
		movielist[10][1]="koi";

		//put movielist[1][0] into movie[0][1] and movie [1][0]
		//put movielist[2][0] into movie[0][2] and movie [2][0]

		int num[]=new int[99];//電影個數

		// 讀到資料後，分類丟入num裏頭
		num[0]=0;//方便迴圈

		int sum=0;


		/*movie[1][1]=[A_1][A_1] ;movie[1][2]=[A_1][A_2]=1 movie[3][4]=[B_1][B_2]=1 movie[4][5]=[B_2][B_3]=1 以此類推
		 			   [0][0]  [0][1]  [0][2]  [0][3]
		 *  		 |  A_1  |  A_2  |  B_1  |  B_2  |
		 [0][0]	  A_1|  \\\  |   1   |       |       |
		 [1][0]	  A_2|   1   |  \\\  |       |       |
		 [2][0]	  B_1|       |       |  \\\  |   1   |
		 [3][0]	  B_2|       |       |   1   |  \\\  | 
		 */		
		Algo a = new Algo();
		
		num=a.countnum(movielist,num);
		for(int i=0;i<num.length;i++){
				sum=sum+num[i];//電影總觀看人數;
		}
		sum++;//easy to 迴圈計算
		String graph[][]=new String[sum][sum];// movie graph
		for(int i=0;i<sum;i++){//put default
			for(int j=0;j<sum;j++){
				graph[i][j]="0";
			}
		}	
		graph=a.into(graph,movielist,sum);//put movielist into graph
		graph=a.samemovie(graph,num);//make same movie connected A-A B-B
		graph=a.diffmovie(movielist,graph,num,sum);//make movie watched by same user connected  ex: xiao-ABC A-B-C
		a.changejson(graph,sum);//print json
		System.out.println();
		a.printmovie(graph,sum);//print two dimension array
	}
	
	public String[][]into(String[][]graph,String[][]movielist,int sum){//put movie name and user to graph
		for(int i=1;i<sum;i++){
			graph[i][0]=graph[0][i]=movielist[i][0];
		}
		
		return graph;
	}

	public String[][]diffmovie(String [][]movielist,String [][]graph,int[]num,int sum){//make different movie connected A-B B-C
		/*
		 * movie[1][3]=[A_1][B_1]=1 , movie[2][9]=[A_2][C_4]=1 , movie[3][6]=[B_1][C_1]=1 , 
		 * movie[4][7]=[B_2][C_2]=1 , movie[5][8]=[B_3][C_3]=1
		 * */
		for(int i=1;i<sum;i++){
			for(int j=i+1;j<sum;j++){
				if(movielist[i][1].equals(movielist[j][1])){
					graph[i][j]="1";
				}		
			}
		}
		
		return graph;
	}

	public int[]countnum(String[][]movielist,int []num){//count number of movie
		for(int i=1,current=1;i<movielist.length;i++){
			for(int j=i;j<movielist.length;j++){
				if(movielist[i][0].equals(movielist[i-1][0])){//check current(movie[i]) and pre(movie[i-1]) is same?
				//	System.out.println("repeat");
					break;
				}else{
					if(movielist[i][0].equals(movielist[j][0])){//check current and next same?
						num[current]++;
					//	System.out.println("num["+current+"]= "+num[current]);
					}else{
						//System.out.println("movielist["+i+"] no ==,movielist["+j+"] break");
						current++;
						break;
					}
				}
			}

		}
		for(int i=0;i<num.length;i++){
			if(num[i]!=0)
			System.out.println("num["+i+"]= "+num[i]);
		}
		return 	num;
	}

	public String[][] samemovie(String[][] graph,int[] num){	////make same movie connected A-A B-B	

		int	index=0;
		for(int i=1;i<num.length-1;i++){
			index=index+num[i-1];
			
			for (int j=1;j<num[i];j++){//j<num[1]=2,j會跑1次,再切到num[2]; j<num[2]=3,j會跑2次,再切到num[3];
				graph[index+j][index+j+1]="1";//movie[1][2]=1(A和A電影連接); movie[3][4]=1,movie[4][5]=1(B和B電影連接);
			//	movie[index+j+1][index+j]="1";//movie[1][0]=1(其實可有可無);
			}
		}
		return graph;

	}

	public void changejson(String [][]graph,int sum){//print json
		for(int i=1;i<sum;i++){
			for(int j=1;j<sum;j++){
				if(graph[i][j].equals("1")){
					//System.out.print("movie["+i+"]["+j+"]= "+movie[i][j] + " "); 
					System.out.println("source:"+i+" "+"target:"+j);
				}
			}
		}

	}
	
	public void printmovie(String [][]graph, int sum){ //print two dimension array
	
		System.out.println("   0 1 2 3 4 5 6 7 8 9 10");
		for(int i=0;i<sum;i++){
			System.out.print(i+": ");
			for(int j=0;j<sum;j++){
				System.out.print(graph[i][j] + " "); 
			}
		        System.out.println(); 
		}
	}
}
