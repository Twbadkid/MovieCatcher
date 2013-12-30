
//五個人中，有2個人看過電影A，3個人看過電影B，五個人看過電影C

public class Algo{
	public static void main (String[] args){ 
		int num[]=new int[99];//電影個數
		num[0]=0;//方便迴圈
		num[1]=2;num[2]=3;num[3]=5;//num放該電影的觀看人數,A電影人數=2 B電影人數=3 C電影人數=5;
		//num[4]=6; 可以再添加
		int sum=0;

		for(int i=0;i<num.length;i++){
				sum=sum+num[i];//電影總觀看人數;
		}

		int movie[][]=new int[sum][sum];
		/*movie[0][0]=[A_1][A_1] ;movie[0][1]=[A_1][A_2]=1 movie[2][3]=[B_1][B_2]=1 movie[3][4]=[B_2][B_3]=1 以此類推
		 	   [0][0]  [0][1]  [0][2]  [0][3]
		 *   |  A_1  |  A_2  |  B_1  |  B_2  |
[0][0]	  A_1|  \\\  |   1   |       |       |
[1][0]	  A_2|   1   |  \\\  |       |       |
[2][0]	  B_1|       |       |  \\\  |   1   |
[3][0]	  B_2|       |       |   1   |  \\\  | 
		  */
		int	index=0;

		
		for(int i=0;i<num.length-1;i++){//連接相同電影  //共三部電影
			index=index+num[i];
			for (int j=1;j<num[i+1];j++){//j<num[1]=2,j會跑1次,再切到num[2]; j<num[2],j會跑2次,再切到num[3];
				movie[index+j-1][index+j]=1;//movie[0][1]=1(A和A電影連接); movie[2][3]=1,movie[3][4]=1(B和B電影連接);
				movie[index+j][index+j-1]=1;//movie[1][0]=1(其實可有可無);
			}
		}




		System.out.println("   0 1 2 3 4 5 6 7 8 9");
		for(int i=0;i<sum;i++){
			System.out.print(i+": ");
			for(int j=0;j<sum;j++){
				System.out.print(movie[i][j] + " "); 
			}
		        System.out.println(); 
		}
	}
}
